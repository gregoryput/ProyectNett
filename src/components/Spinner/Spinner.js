import styled, {keyframes} from 'styled-components';
import { Colores } from '../GlobalColor';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
 border: 2px solid #f3f3f3;
  border-top: 4px solid transparent;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 0.8s linear infinite;
`;


export const SpinnerTables = styled.div`
 border: 5px solid ${Colores.AzulMar};
  border-top: 10px solid transparent;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 0.8s linear infinite;
  margin: 150px auto;
`;
