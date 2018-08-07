import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

const Refresh = styled.button.attrs({
  title: 'Update now',
})`
  align-items: center;
  background-color: transparent;
  border: none;
  color: darkgreen;
  display: flex;
  font-size: 18px;
  justify-content: center;
  margin-left: 0.6rem;
  padding: 0.2rem;

  &:disabled {
    color: gray;
  }
`;

const Span = styled.span`
  display: inline-block;
  min-width: ${(p: any) => p.chars || 1}ch;
  text-align: center;
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: center;
`;

const StatusBar = inject('data')(
  observer(({ data }) => {
    const { getPrices, secondsSinceUpdate } = data;
    const isDisabled = secondsSinceUpdate < 5;
    const ending = secondsSinceUpdate === 1 ? ' ' : 's';

    return (
      <Wrapper>
        Last update <Span chars={3}>{secondsSinceUpdate}</Span> second<Span>
          {ending}
        </Span>&nbsp;ago
        <Refresh onClick={getPrices} disabled={isDisabled}>
          &#x27F3;
        </Refresh>
      </Wrapper>
    );
  })
);

export default StatusBar;
