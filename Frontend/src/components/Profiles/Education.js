import React from 'react';
import Modal from 'react-modal';

export default props => {
  const {
     openPopup, closePopUp,  onCollegNameChangeInput,onDegreeChangeInput,onMajorChangeInput,onCGPAChangeInput,onEduLocationChangeInput,onYOPChangeInput, onEducationHandleSubmit, updateEduFlag, eduCollegeName,eduDegree, eduMajor, eduLocation, eduCGPA, eduYOP
  } = props;

  return (
      
    <Modal
      id="education"
      contentLabel="modalB"
      closeTimeoutMS={150}
      isOpen={openPopup}
      >
      <h1></h1>
      {updateEduFlag && <p>Update Successful!</p>}
      <form onSubmit={onEducationHandleSubmit}>                      
                                <div class="form-group">
                                    <input onChange = {onCollegNameChangeInput} type="text" class="form-control" name="companyName" placeholder="College Name" value={eduCollegeName}/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {onDegreeChangeInput} type="text" class="form-control" name="degree" placeholder="Degree" value={eduDegree}/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {onMajorChangeInput} type="text" class="form-control" name="major" placeholder="Major" value={eduMajor}/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {onCGPAChangeInput} type="text" class="form-control" name="cgpa" placeholder="CGPA" value={eduCGPA}/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {onEduLocationChangeInput} type="text" class="form-control" name="eduLocation" placeholder="Location" value={eduLocation}/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {onYOPChangeInput} type="text" class="form-control" name="yop" placeholder="Year of Passout" value={eduYOP}/>
                                </div>
                                <button class="btn btn-info">Update</button>&nbsp;&nbsp;&nbsp;
                                <button onClick={closePopUp} class="btn btn-info">Close</button>   
                            </form>    
    </Modal>
  );
}