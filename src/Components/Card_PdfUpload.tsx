import React from "react"
import { Card } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
faSmileWink
} from "@fortawesome/free-regular-svg-icons";

interface IProps {
    setStateofInstruction: Function;
}


class CardPdf extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
      }

    render() {
        return (
            <div>
                <Card title="PDF Upload" extra={<a onClick={() => this.props.setStateofInstruction()}>Anleitung</a>} bordered={false} headStyle={{padding: 0}} bodyStyle={{paddingLeft: 0, paddingRight: 0}}>
                    <p>Keine Lust deine Noten manuell einzugeben? <FontAwesomeIcon icon={faSmileWink}/> Lasse deinen Notendurchschnitt berechnen, indem du deinen aktuellen Notenspiegel der Hochschule Heilbronn als PDF einließt. Hinweis: Auch unvollständige Notenspiegel können berechnet werden.</p>
                </Card>
            </div>
        )
    }
}

export default CardPdf