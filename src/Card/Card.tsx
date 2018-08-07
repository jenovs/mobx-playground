import React from 'react';
import { inject, observer } from 'mobx-react';
import { Draggable } from 'react-beautiful-dnd';

import NumInput from '../NumInput';

import {
  CardWrapper,
  Delete,
  DeltaWrapper,
  Label,
  TotalWrapper,
  FromCurrency,
} from './styled';

import { formatDelta, formatTotal, getColor } from '../utils';

const Card = inject('data')(
  observer(({ amount, data, delta, id, index, from, to, price }) => {
    const total = price * (amount === undefined ? 1 : amount);
    const color = getColor(delta, price);
    const deltaString = delta ? formatDelta(delta * amount) : '';

    return (
      <Draggable draggableId={`${id}`} index={index}>
        {provided => (
          <CardWrapper
            innerRef={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            data-testid="card"
          >
            <FromCurrency>
              <NumInput id={id as number} />
              <Label>{from}</Label>
            </FromCurrency>
            <TotalWrapper color={color}>
              <div>{formatTotal(total)}</div>
              <Label>{to}</Label>
            </TotalWrapper>
            <DeltaWrapper color={color}>
              {!!delta && delta > 0 && !!deltaString.length && '+'}
              {!!deltaString.length && deltaString + ` ${to}`}
            </DeltaWrapper>
            <Delete onClick={() => data.deletePair(id)}>x</Delete>
          </CardWrapper>
        )}
      </Draggable>
    );
  })
);

export default Card;
