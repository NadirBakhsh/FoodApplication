import React, { Component } from 'react';
import "./CertificateForm.css"




class CertificatForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedFile : null,
        }
        this.onupLoadfun = this.onupLoadfun.bind(this);
        this.fileSelectHandler = this.fileSelectHandler.bind(this);

    }

  onupLoadfun() {
        const {selectedFile,describe} = this.state;
    // addPost(selectedFile,describe)
            
    }

    fileSelectHandler(e){
       let fileInfo = e.target.files;
        this.setState({
            selectedFile : fileInfo,
        })
    }
    


    render() {
        const {selectedFile,describe} = this.state;    
        
        return (
            <div className='imageDiv'> 
                
                <textarea  value={describe} onChange={(e) =>{this.setState({describe : e.target.value})}} placeholder="Type here discripction"></textarea>
                <input style={{display: 'none',}} 
                ref={fileInput => this.fileInput = fileInput}
                type="file" multiple
                 onChange={this.fileSelectHandler} />
               
                <div className="btn-certicate">
                <button onClick={() => this.fileInput.click() }>Select Images</button>
                <button  onClick={this.onupLoadfun}>Upload</button>
                </div>

            </div>
        );
    }
}

export default CertificatForm;