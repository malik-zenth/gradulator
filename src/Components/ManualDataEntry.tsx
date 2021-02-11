import React from "react"
import { Card } from 'antd';

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
                    <p>Lasse deinen Notendurchschnitt berechnen, indem du manuell deine aktuellen Noten eingibst. Hinweis: Deinen aktuellen Notenspiegel findest du unter https://stud.zv.hs-heilbronn.de/</p>
                </Card>
            </div>
        )
    }
}

export default ManualDataEntry