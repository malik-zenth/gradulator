import React from "react"
import Draggable from "react-draggable"


interface iProps{}

const ExamPackageDegreeCreation = (props: iProps) => {

    return(
        <div>
            <div>NAME</div>
            <Draggable
                defaultClassName="ExamPackageDraggable"
                axis="x"
                handle=".handle"
                defaultPosition={{x: 0, y: 0}}
                position={null}
                grid={[25, 25]}
                scale={1}>
                    <div>
                <div>
                    <div className="handle">Drag from here</div>
                    <div>This readme is really dragging on...</div>
                </div>
                <div>
                    <div className="handle">Drag from here</div>
                    <div>This readme is really dragging on...</div>
                </div>
                </div>
            </Draggable>
        </div>
    )
}

export default ExamPackageDegreeCreation