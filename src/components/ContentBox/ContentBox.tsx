import * as React from 'react';
import styles from './ContentBox.scss';

export interface ContentBoxProps {
  title: string,
  children?: any
}

interface ContentBoxState {
  hidden: boolean
}

export default class ContentBox extends React.Component<ContentBoxProps, ContentBoxState> {
  constructor(props) {
    super(props);

    this.state = {
      hidden: false
    };

    this.onHeaderClick = this.onHeaderClick.bind(this);
  }

  onHeaderClick() {
    this.setState({
      hidden: !this.state.hidden
    });
  }

  render() {
    const containerStyle = !this.state.hidden ?
      styles.ContentBoxContentContainerVisible :
      styles.ContentBoxContentContainerHidden;

    return (
      <div className={styles.ContentBox}>
        <div className={styles.ContentBoxHeader} onClick={this.onHeaderClick}>
          {this.props.title}
        </div>

        { !this.state.hidden ?
          <div className={styles.ContentBoxContent}>
            {this.props.children}
          </div>
          : null
        }
      </div>
    );
  }
}
