import React from "react"
import { Card } from 'antd';

class CardPdf extends React.Component {

    render() {
        return (
            <div>
                <Card title="PDF Upload" bordered={false} headStyle={{padding: 0}} bodyStyle={{paddingLeft: 0, paddingRight: 0}}>
                    <p>Lasse deinen Notendurchschnitt berechnen, indem du deinen aktuellen Notenspiegel der Hochschule Heilbronn als PDF einließt. Hinweis: Deinen aktuellen Notenspiegel findest du unter https://stud.zv.hs-heilbronn.de/</p>
                </Card>
            </div>
        )
    }
}

export default CardPdf