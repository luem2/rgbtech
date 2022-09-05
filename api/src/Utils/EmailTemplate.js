module.exports = {
  htmlMail: (link) => {
    return `<div style='background-color:#FCFBFA; border-radius:10px; color:black;display:flex; align-items:center; flex-direction:column; font-family:sans-serif; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;'>
    <img src='https://i.postimg.cc/J033M83x/logo-dibujo.png' border='0' alt='logo-dibujo' style='width:250px'/>
    <h2 style='color:#FF127E; margin-top:20px; margin-bottom:20px;'>Welcome to RGBTech</h2>
    <p>____Tap the button below to confirm your email address.<br/> If you didn't create an account you can safely delete this email.</p>
    <button style="margin-top:20px; margin-bottom:20px; display: inline-block; padding: 10px 30px; font-family:sans-serif; font-size: 16px; border-radius: 6px; border:none; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;"><a href=${link} target='_blank' style='text-decoration: none;  color: #FF127E; font-weight:550'>Confirm Your Email Address</a></button>
    </div>`
  },
  htmlMailRecoverPassword : (link) => {
    return `<div style='background-color:#FCFBFA; border-radius:10px; color:black;display:flex; align-items:center; flex-direction:column; font-family:sans-serif; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;'>
    <img src='https://i.postimg.cc/J033M83x/logo-dibujo.png' border='0' alt='logo-dibujo' style='width:250px'/>
    <h2 style='color:#FF127E; margin-top:20px; margin-bottom:20px;'>Welcome to RGBTech</h2>
    <p>____Tap the button below to confirm your email address and retrieve your password.<br/> If you didn't create an account you can safely delete this email.</p>
    <button style="margin-top:20px; margin-bottom:20px; display: inline-block; padding: 10px 30px; font-family:sans-serif; font-size: 16px; border-radius: 6px; border:none; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;"><a href=${link} target='_blank' style='text-decoration: none;  color: #FF127E; font-weight:550'>Confirm Your Email Address</a></button>
    </div>`
  }
}