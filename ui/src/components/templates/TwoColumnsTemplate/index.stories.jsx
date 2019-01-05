import React from 'react';
import CenteringTemplate from '.';

const contentsSampleEl = (
  <>
    <h1>問題</h1>
    <p>『エビフライ』にあって、『カキフライ』にないもの、なぁ〜んだ？</p>
    <p>答え：エビ</p>
  </>
);

export
stories => stories
  .add('horizontal', () => <CenteringTemplate horizontal>{contentsSampleEl})</CenteringTemplate>)
  .add('vertical', () => <CenteringTemplate horizontal>{contentsSampleEl})</CenteringTemplate>)
  .add('horizontal and vertical', () => <CenteringTemplate horizontal vertical>{contentsSampleEl})</CenteringTemplate>)
