import React from "react"
import { Card } from 'antd';

  interface IState {
    instructionsVisible: boolean;
  }

class CardPdf extends React.Component<IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            instructionsVisible: true,
          };
      }

    render() {
        return (
            <div>
                <Card title="PDF Upload" extra={<a onClick={() => this.setState({instructionsVisible: true})}>Anleitung</a>} bordered={false} headStyle={{padding: 0}} bodyStyle={{paddingLeft: 0, paddingRight: 0}}>
                    <p>Lasse deinen Notendurchschnitt berechnen, indem du deinen aktuellen Notenspiegel der Hochschule Heilbronn als PDF einließt. Hinweis: Deinen aktuellen Notenspiegel findest du unter https://stud.zv.hs-heilbronn.de/</p>
                </Card>
            </div>
        )
    }
}

export default CardPdf