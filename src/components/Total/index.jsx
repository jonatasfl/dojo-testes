import React from 'react';
import { Stat, StatLabel, StatNumber } from '@chakra-ui/react';

export default class Total extends React.Component { //eslint-disable-line
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { type, value } = this.props;

    const typeColor = {
      inbound: {
        title: 'Total Recebido',
        color: 'green.300',
      },
      outbound: {
        title: 'Total Gasto',
        color: 'red.300',
      },
    };

    return (
      <Stat>
        <StatLabel>{typeColor[type].title}</StatLabel>
        <StatNumber color={typeColor[type].color}>
          {(+value).toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          })}
        </StatNumber>
      </Stat>
    );
  }
}
