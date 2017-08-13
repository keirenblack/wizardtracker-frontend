import * as React from 'react';
import ContentBox from '../ContentBox/ContentBox';

import DeviceConnector from './DeviceConnector/DeviceConnector'

export default () =>
  <ContentBox title='Tracker'>
    <DeviceConnector comPorts={['COM1', 'COM2']} connected={false}/>
  </ContentBox>
