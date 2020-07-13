import React from 'react';
import Modal from 'react-modal';

export default props => {
  const {
     isOpen, askToClose, onChangeInput, experience, onCompanyChangeInput,onTitleChangeInput,onLocationChangeInput,onDescriptionChangeInput,onStartDateChangeInput,onEndDateChangeInput, onHandleSubmit, updateFlag, expCompany,experienceCompany, experienceTitle, experienceLocation, experienceDescription, experienceStartDate, experienceEndDate
  } = props;

  return (
      
    <Modal
      id="test"
      contentLabel="modalA"
      closeTimeoutMS={150}
      isOpen={isOpen}
      >
      <h1></h1>
      {updateFlag && <p>Update Successful!</p>}
      <form onSubmit={onHandleSubmit}>                      
                                <div class="form-group">
                                    <input onChange = {onCompanyChangeInput} type="text" class="form-control" name={expCompany} placeholder="Company Name" value={experienceCompany}/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {onTitleChangeInput} type="text" class="form-control" name="title" placeholder="Title" value={experienceTitle}/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {onLocationChangeInput} type="text" class="form-control" name="location" placeholder="Location" value={experienceLocation}/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {onDescriptionChangeInput} type="text" class="form-control" name="description" placeholder="Description" value={experienceDescription}/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {onStartDateChangeInput} type="date" class="form-control" name="startDate" placeholder="start-date" value={experienceStartDate}/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {onEndDateChangeInput} type="date" class="form-control" name="endDate" placeholder="end-date" value={experienceEndDate}/>
                                </div>
                                <button class="btn btn-info">Update</button>&nbsp;&nbsp;&nbsp;
                                <button onClick={askToClose} class="btn btn-info">Close</button>   
                            </form>    
    </Modal>
  );
}