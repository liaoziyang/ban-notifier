import styled from 'styled-components'

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 60px;
  ${({ color, theme }) => defineBackgroundColor(color, theme)};
  text-transform: uppercase;
  font-weight: 800;
  box-shadow: 2px 3px 15px 0 rgba(0,0,0,0.47);
  transition: .2s transform ease-in-out;
  cursor: pointer;
  &:hover{
    transform: ${(props) => props.hoverDirection === 'vertical' ? 'translateY(-6px)' : 'translateX(-6px)'};
  }
`
function defineBackgroundColor(color, theme){
  switch (color){
    case 'red':
      return `background-color: ${theme.red}; color: white;`
    case 'white':
      return `background-color: white; color: ${theme.red};`
    case 'orange':
      return `background-color: ${theme.orange}; color: white;`
    case 'gray':
      return `background-color: ${theme.gray}; color: white;`
  }
}
