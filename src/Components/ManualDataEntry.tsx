import React from "react"
import { Card } from 'antd';

class ManualDataEntry extends React.Component {

    render() {
        return (
            <div>
                <Card title="Manuelle Noteneingabe" bordered={false} bodyStyle={{paddingBottom: 0}}>
                    <p>Lasse deinen Notendurchschnitt berechnen, indem du manuell deine aktuellen Noten eingibst. Hinweis: Deinen aktuellen Notenspiegel findest du unter https://stud.zv.hs-heilbronn.de/</p>
                </Card>
            </div>
        )
    }
}

export default ManualDataEntry