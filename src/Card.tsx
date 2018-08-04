import React from 'react';
import { inject, observer } from 'mobx-react';
import { Draggable } from 'react-beautiful-dnd';

import NumInput from './NumInput';

import {
  CardWrapper,
  DeltaWrapper,
  InputWrapper,
  TotalWrapper,
} from './styled';

const style = {
  numInput: {
    display: 'flex',
  },
};

const Card = inject('data')(
  observer(({ amount, data, delta, id, index, from, to, price }) => {
    const total = price * (amount === undefined ? 1 : amount);
    const formatTotal = (t: number) => {
      return t >= 1 ? t.toFixed(2) : t > 0 ? t : '...';
    };

    return (
      <Draggable draggableId={`${id}`} index={index}>
        {provided => (
          <CardWrapper
            innerRef={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            data-testid="card"
          >
            <InputWrapper>
          <NumInput id={id as number} /> {from}
            </InputWrapper>
            <TotalWrapper>
          {formatTotal(total)} {to}
            </TotalWrapper>
            <DeltaWrapper color={color}>
            </DeltaWrapper>
        <button onClick={() => data.deletePair(id)}>Delete</button>
          </CardWrapper>
        )}
      </Draggable>
    );
  })
);

export default Card;
