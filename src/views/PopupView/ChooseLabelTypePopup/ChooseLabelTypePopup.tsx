import React from 'react'
import './ChooseLabelTypePopup.scss'
import {GenericYesNoPopup} from "../GenericYesNoPopup/GenericYesNoPopup";
import {PopupWindowType} from "../../../data/enums/PopupWindowType";
import {updateActivePopupType} from "../../../store/general/actionCreators";
import {updateProjectData} from '../../../store/general/actionCreators';
import {AppState} from "../../../store";
import {connect} from "react-redux";
import {ProjectType} from "../../../data/enums/ProjectType";
import {ProjectData} from '../../../store/general/types';

interface IProps {
    projectData: ProjectData;
    updateProjectData: (projectData: ProjectData) => any;
    updateActivePopupType: (activePopupType: PopupWindowType) => any;
}

const ChooseLabelTypePopup: React.FC<IProps> = (
    {
        projectData,
        updateProjectData,
        updateActivePopupType
    }) => {

    const setLabelTypeToObjectDetection = () => {
        updateProjectData({
            ...projectData,
            type: ProjectType.OBJECT_DETECTION
        });
        updateActivePopupType(null);
    }

    const setLabelTypeToImageRecognition = () => {
        updateProjectData({
            ...projectData,
            type: ProjectType.IMAGE_RECOGNITION
        });
        updateActivePopupType(null);
        // updateActivePopupType(PopupWindowType.UPDATE_LABEL);
    }

    const renderContent = () => {
        return(<div className="ChooseLabelTypePopup">
            <div className="RightContainer">
                <div className="Message">
                    {
                        "Before you start, you can create a list of labels you plan to assign to objects in your " +
                        "project. You can also choose to skip that part for now and define label names as you go."
                    }
                </div>
            </div>
        </div>);
    };

    return(
        <GenericYesNoPopup
            title={"Select Label Type"}
            renderContent={renderContent}
            acceptLabel={"Object Detection"}
            onAccept={setLabelTypeToObjectDetection}
            rejectLabel={"Image Recognition"}
            onReject={setLabelTypeToImageRecognition}
        />)
};

const mapDispatchToProps = {
    updateProjectData,
    updateActivePopupType
};

const mapStateToProps = (state: AppState) => ({
    projectData: state.general.projectData
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChooseLabelTypePopup);
