import React from "react"
import { Card } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
faFrown
} from "@fortawesome/free-regular-svg-icons";

interface IProps {
    setStateofInstruction: Function;
}

class ManualDataEntry extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
      }

    render() {
        return (
            <div>
                <Card title="Manuelle Noteneingabe" extra={<a onClick={() => this.props.setStateofInstruction()}>Anleitung</a>} bordered={false} headStyle={{padding: 0}} bodyStyle={{paddingLeft: 0, paddingRight: 0}}>
                    <p>Gerade den Notenspiegel nicht parat? <FontAwesomeIcon icon={faFrown}/> Lasse deinen Notendurchschnitt berechnen, indem du manuell deine aktuellen Noten eingibst.</p>
                </Card>
            </div>
        )
    }
}

export default ManualDataEntry