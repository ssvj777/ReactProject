import React, { useContext } from 'react'
import { userContext } from './Child';



class Footer extends React.Component {
  render() {
    let date = new Date()
    let year = String(date.getFullYear()) 
    return (
      <footer>
        <div className="footer-content">
        <userContext.Consumer>
          {({userData}) => {
            return (

            <div>
              <h2>{userData.toUpperCase()}@{year}</h2>
              </div> )
          }}
        </userContext.Consumer>
        </div>
      </footer>
    );
  }
}

export default Footer;
