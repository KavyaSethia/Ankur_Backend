import React from 'react'
import './AU_section5.css'
import img1 from '../../../Images/au/aboutUs-img4.jpeg'
import img2 from '../../../Images/au/aboutUs-img5.jpeg'
import img3 from '../../../Images/au/aboutUs-img6.jpeg'
import img4 from '../../../Images/au/aboutUs-img7.jpeg'

const AU_Section5 = () => {
  return (
    <>
    <div className="AU_section5_mainContainer">
    <div className="AU_section5_TextContainer">
        <p className='AU_section5_TextContainer-Text1'>PROJECT ANKUR TEAM</p>
        <p className='AU_section5_TextContainer-Text2'>Meet the Expert Team</p>
    </div>
    <div className="AU_section5_gridContainer">
        <div className="AU_section5_gridContainerDiv">
            <img className='AU_section5_gridContainerDiv-img' src={img1} alt="" />
            <div className="AU_section5_gridContainerDiv-textDiv">
                <div className="AU_section5_gridContainerDiv-text1">Kavya Sethia</div>
                {/* <div className="AU_section5_gridContainerDiv-text2">Founder and CEO</div> */}
            </div>
        </div>
        <div className="AU_section5_gridContainerDiv">
            <img className='AU_section5_gridContainerDiv-img' src={img2} alt="" />
            <div className="AU_section5_gridContainerDiv-textDiv">
                <div className="AU_section5_gridContainerDiv-text1">Ishita Rakchhit</div>
                {/* <div className="AU_section5_gridContainerDiv-text2">Co-Founder & CTO</div> */}
            </div>
        </div>
        <div className="AU_section5_gridContainerDiv">
            <img className='AU_section5_gridContainerDiv-img' src={img3} alt="" />
            <div className="AU_section5_gridContainerDiv-textDiv">
                <div className="AU_section5_gridContainerDiv-text1">Saumya Bharti</div>
                {/* <div className="AU_section5_gridContainerDiv-text2">CFO & CTO</div> */}
            </div>
        </div>
        <div className="AU_section5_gridContainerDiv">
            <img className='AU_section5_gridContainerDiv-img' src={img4} alt="" />
            <div className="AU_section5_gridContainerDiv-textDiv">
                <div className="AU_section5_gridContainerDiv-text1">Harshita Deep</div>
                {/* <div className="AU_section5_gridContainerDiv-text2">Chief Marketing Officer</div> */}
            </div>
        </div>
        
    </div>
    </div>
    </>
  )
}

export default AU_Section5;