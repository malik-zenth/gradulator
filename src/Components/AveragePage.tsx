import React, { ReactFragment, ReactText } from "react";
import {
  CalculationResult,
  UserInput,
  SingleOption,
  Exam,
} from "../Data/types";
import { calculateData } from "./Calculation/calculation";
import { GradePackageAverage } from "./Calculation/types";
import { Button, Divider, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faInfoCircle,
  faAngleRight,
  faAngleDown
} from "@fortawesome/free-solid-svg-icons";
import { TooltipEstimatedGrades, TooltipNotComplete, TooltipECTS, TooltipWertungspunkte } from "./const";

interface IProps {
  inputGrades: UserInput[];
  selectedOption: SingleOption;
  newCalculation: Function;
  editCalculation: Function;
}

interface IState {
  notDisplayedGradeNames: string[]
}

const keyGenerator = (): ReactText =>
  "_" + Math.random().toString(36).substr(2, 9);

class AveragePage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      notDisplayedGradeNames: []
    };
  }

  changeCollabStatus(name: string){
    var {notDisplayedGradeNames} = this.state
    if(!notDisplayedGradeNames.includes(name)){
      notDisplayedGradeNames.push(name)
    }else{
      notDisplayedGradeNames = notDisplayedGradeNames.filter(x => x != name)
    }
    this.setState({notDisplayedGradeNames: notDisplayedGradeNames})
  }

  renderSingleGrades(singleGrades: GradePackageAverage[]): ReactFragment {
    return singleGrades.map((single: GradePackageAverage) => {
      return (
        <div key={keyGenerator()}>
          <div className="single-gradebox">
          <div className="single-grade-collabs">
            {(single.bestPossibleGrade || single.incomplete) &&
              <div className="single-grade-collabs-icon" onClick={() => this.changeCollabStatus(single.name)}>
              {this.state.notDisplayedGradeNames.includes(single.name) && <FontAwesomeIcon icon={faAngleRight}/>}
              {!this.state.notDisplayedGradeNames.includes(single.name) && <FontAwesomeIcon icon={faAngleDown}/>}
              </div>
              }
          </div>
            <p className="single-grade-name">{single.name}</p>
            <p className="single-grade-grade">{single.grade}</p>
          </div>
          {!this.state.notDisplayedGradeNames.includes(single.name) &&
          <div>
          {this.renderCaseGrades(single)}
          {this.renderIncomplete(single)}
          </div>
      	  }
        </div>
      );
    });
  }

  renderCaseGrades(single: GradePackageAverage): ReactFragment {
    if (single.bestPossibleGrade) {
      return (
        <div className="result-case-grades">
          <p className="result-case-info">
            <Tooltip title={TooltipEstimatedGrades}>
              <FontAwesomeIcon className="text-icon" icon={faInfoCircle} />
              Note enthält geschätzte Noten
            </Tooltip>
          </p>
          <p className="result-best-case">
            Bestmögliche Note: {single.bestPossibleGrade}
          </p>
          <p className="result-worst-case">
            Schlechteste Note: {single.worstPossibleGrade}
          </p>
        </div>
      );
    } else return <div></div>;
  }

  renderIncomplete(single: GradePackageAverage): ReactFragment {
    if (single.incomplete) {
      return (
        <div className="result-incomplete-box">
          <p className="result-incomplete-info">
            <Tooltip title={TooltipNotComplete}>
              <FontAwesomeIcon className="text-icon" icon={faExclamationCircle} />
              Modul erst zu {single.completeness}% abgeschlossen.
            </Tooltip>
          </p>

          {single.missing.length > 1 && <p>Folgende Noten fehlen noch: </p>}
          {single.missing.length == 1 && <p>Folgende Note fehlt noch: </p>}
          {single.missing.map((missing: Exam) => {
            return <li key={keyGenerator()}>{missing.name}</li>;
          })}
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  renderGrades(singleGrades: GradePackageAverage[]): ReactFragment {
    return (
      <div>
        <Divider orientation="left">Einzelne Notenpakete</Divider>
        {this.renderSingleGrades(singleGrades)}
      </div>
    );
  }

  renderAverage(averageData: CalculationResult) {
    return (
      <div>
        <Divider orientation="left">Durchschnitt</Divider>
        <div className="result-average">
          <div className="result-average-basic">
            {averageData.requiredEmphasis != 0 && (
              <p>
                {averageData.completedEmphasis} von {averageData.requiredEmphasis} benötigten Schwerpunkten abgeschlossen
              </p>
            )}
            <p>
            <Tooltip title={TooltipWertungspunkte}>
              <FontAwesomeIcon className="text-icon" icon={faInfoCircle} />
              {averageData.observedWeight} von {averageData.overallWeight} Wertungspunkten für den Durchschnitt berücksichtigt
              </Tooltip>
            </p>
            <p>
            <Tooltip title={TooltipECTS}>
              <FontAwesomeIcon className="text-icon" icon={faInfoCircle} />
              {averageData.achivedECTS} von {averageData.requiredECTS} für den Durchschnitt relevanten ECTS erreicht
              </Tooltip>
            </p>
            {averageData.removedEmphasis && (
              <p>
                Noten des Schwerpunktes {averageData.removedEmphasisName} wurden entfernt
              </p>
            )}
            {this.renderButtons()}
          </div>
          <div className="result-average-result">
            <p className="result-average-expected">
              Durchschnitt: {averageData.grade}
            </p>
            <div className="result-case-averages">
              {averageData.bestAverage && (
                <p className="result-case-best-average">
                  Bestmöglicher Durchschnitt: {averageData.bestAverage}
                </p>
              )}
              {averageData.worstAverage && (
                <p className="result-case-worst-average">
                  Schlechtester Möglicher Durchschnitt:{" "}
                  {averageData.worstAverage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderButtons(): ReactFragment {
    return (
      <div className="average-page-buttons">
        <Button
          htmlType="submit"
          onClick={() => this.props.editCalculation(this.props.inputGrades)}
        >
          Noteneingabe bearbeiten
        </Button>
        <div className="form-grades-button-reset">
          <Button htmlType="button" onClick={() => this.props.newCalculation()}>
            Neuen Durchschnitt berechnen
          </Button>
        </div>
      </div>
    );
  }

  render() {
    const { inputGrades, selectedOption } = this.props;
    const calculationResult: CalculationResult = calculateData(
      inputGrades,
      selectedOption
    );
    return (
      <div className="result-page">
          <div className="form-grades-back">
          <Button htmlType="button" onClick={() => this.props.newCalculation()}>
            Zurück zur Startseite
          </Button>
        </div>
        <h2 className="result-heading">
          Notenschnitt {selectedOption.basics.name}
        </h2>
        {this.renderGrades(calculationResult.singleGrades)}
        {this.renderAverage(calculationResult)}
      </div>
    );
  }
}

export default AveragePage;