import styled from 'styled-components';

const FormContainer = styled.div`
  margin: 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 7px;
  margin-bottom: 7px;
  && ~ .MuiTypography-root {
    margin-top: 14px;
    margin-left: 10px;
    margin-bottom: 14px;
  }
`;

const InputItem = styled.div`
  flex-grow: ${props => props.flexGrow || 1};
  margin: 3px 10px;
  min-width: 150px;
  flex: 1;
  align-content: stretch;
  flex-direction: column;
`;

export { InputContainer, InputItem, FormContainer };
