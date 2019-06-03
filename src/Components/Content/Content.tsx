import * as React from 'react';
import * as styles from './styles.css'

interface IContentState {
    isChatOpen:boolean;
}
export class Content extends React.Component<{}, IContentState> {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = { isChatOpen: false };
    }
    render() {
        return (
            <div style={styles.}">
                <div className="navbar"></div>
                <div className="content"></div>
                {this.state.isChatOpen && <div className="chatArea"></div>}
            </div>
          );
      }
  }
  
export default Content;