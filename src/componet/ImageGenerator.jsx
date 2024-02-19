import React, { useRef, useState } from 'react';
import "./ImageGenerator.css"
import default_image from "../../public/images/effect.jpg";
const ImageGenerator = () => {

    const [image_url , setImage_url]=useState("/")
    const [ loading , setLoading]=useState(false);
    let inputRef=useRef(null);

    const imageGenerator = async ()=>{
        if(inputRef.current.value===""){
            return 0 ;
        }
        const response = await fetch("api here",
        {
            method:"POST",
            headers:{
                "Content-type":"application/json",
                Authrization: "sceret key",
                "User-Agent":"Chrome",
            },
            body:JSON.stringify({
                prompt: `${inputRef.current.value}`,
                n:1,
                size:"512x512"
            }),
        } );

        let data= await response.json();
        console.log(data);
        let data_array = data.data;
        setImage_url(data_array[0].url);
    }

    return (
        <div className='ai-image-generator'>
            <div className="header">AI Image <span>Generator</span></div>

            <div className="img-loading">
                <div className="image">
                    <img src={image_url==="/"?default_image:image_url} alt="example" />
                </div>
                <div className="loading">
                    <div className={loading?"loading-bar-full":"loading-bar"}></div>
                    <div className={loading?"loading-text":"display-none"}>Loadding.....</div>

                </div>
            </div>
            <div className="search-box">
                <input type="text" ref={inputRef} className='search-input' placeholder='Describe what you want to create...' />
                <div className="generate-btn" onClick={()=>{ImageGenerator()}}>Generate</div>
            </div>
        </div>
    );
};

export default ImageGenerator;