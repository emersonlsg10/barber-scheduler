import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import HeaderFab from 'components/HeaderComponent/HeaderFab';
import HeaderBoxContainer from 'components/HeaderComponent/HeaderBoxContainer';
import HeaderBoxItem from 'components/HeaderComponent/HeaderBoxItem';

const StyledContainer = styled.div`
  && {
    display: flex;
    flex: 1;
    flex-direction: row;
    margin: 15px 0;
    align-items: center;
    flex-wrap: wrap;
  }
`;

const StyledTypography = styled(Typography)`
  && {
    font-weight: 300;
    flex: 1;
  }
`;

const HeaderComponent = ({ title, variant, children, goBack }) => (
  <StyledContainer>
    {goBack && (
      <HeaderBoxContainer>
        <HeaderBoxItem style={{ marginRight: 10, marginTop: -5 }}>
          <HeaderFab icon="arrow_back" onClick={goBack} />
        </HeaderBoxItem>
      </HeaderBoxContainer>
    )}
    <StyledTypography variant={variant} gutterBottom>
      {title}
    </StyledTypography>
    <>{children}</>
  </StyledContainer>
);

HeaderComponent.propTypes = {
  title: PropTypes.string.isRequired,
  variant: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func,
    PropTypes.object,
  ]),
  goBack: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};

HeaderComponent.defaultProps = {
  children: null,
  variant: 'h4',
  goBack: false,
};

export default HeaderComponent;
