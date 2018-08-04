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

import { formatDelta, formatTotal, getColor } from './utils';

const Card = inject('data')(
  observer(({ amount, data, delta, id, index, from, to, price }) => {
    const total = price * (amount === undefined ? 1 : amount);
    const color = getColor(delta, price);

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
              {!!delta && delta > 0 && '+'}
              {!!delta && formatDelta(delta * amount) + ` ${to}`}
            </DeltaWrapper>
            <button onClick={() => data.deletePair(id)}>Delete</button>
          </CardWrapper>
        )}
      </Draggable>
    );
  })
);

export default Card;
