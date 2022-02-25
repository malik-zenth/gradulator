import { Button } from "antd"
import React, { useContext } from "react"
import { CreatorContext } from "../CreatorContext"
import { BasicInformations } from "../FormComponents"

interface iProps {

}

const BasicsStep = (props: iProps) => {
    const { basicInformations, setEditBasics } = useContext(CreatorContext)

    return (
        <div className="singleStepDegreeCreator">
            {basicInformations.editMode &&
                <BasicInformations />
            }
            {!basicInformations.editMode &&
                <div className="creator_basicInformations">
                    <div className="inline width100 elevativeText degreeCreator_exampackage_text bold">
                        <p className="labelBasics">Name:</p>
                        {basicInformations.name}
                    </div>
                    <div className="inline width100 elevativeText degreeCreator_exampackage_text">
                        <p className="labelBasics">Kürzel:</p>
                        {basicInformations.shortName}</div>
                    <div className="inline width100 elevativeText degreeCreator_exampackage_text">
                        <p className="labelBasics">Anzahl benötigter Schwerpunkte:</p>
                        {basicInformations.amoundRequiredEmphasis}</div>
                    <div className="inline width100 elevativeText degreeCreator_exampackage_text">
                        <p className="labelBasics">SPO:</p>
                        {basicInformations.spo}</div>

                    <div className="buttonBasicInformations">
                        <Button
                            htmlType="submit"
                            onClick={() => setEditBasics()}>
                            Bearbeiten
                        </Button>
                    </div>
                </div>

            }
        </div>
    )
}

export default BasicsStep