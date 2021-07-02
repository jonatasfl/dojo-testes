import React from 'react';
import { Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons';

export default class Total extends React.Component { //eslint-disable-line
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { type, value } = this.props;

    const typesMap = {
      inbound: {
        title: 'Total Recebido',
        color: 'green.300',
        icon: <TriangleUpIcon mr={2} />,
      },
      outbound: {
        title: 'Total Gasto',
        color: 'red.300',
        icon: <TriangleDownIcon mr={2} />,
      },
    };

    return (
      <Stat textAlign="center">
        <StatLabel>{typesMap[type].title}</StatLabel>
        <StatNumber color={typesMap[type].color}>
          {typesMap[type].icon}
          {(+value).toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          })}
        </StatNumber>
      </Stat>
    );
  }
}
