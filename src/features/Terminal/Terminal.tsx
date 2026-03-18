
import { WindowWrapper } from 'components/hoc/WindowWrapper'
import { Check, Flag } from 'lucide-react';
import * as React from 'react'
import styled from 'styled-components'
import { techStack } from 'config';

const Terminal: React.FC = () => {

  return (
    <TechStackStyles>
      <p>
        <span style={{ fontWeight: "bold" }}>@Heisey % load_skills -A</span>
      </p>

      <LabelStyles>
        <p>Category</p>
        <p>Technologies</p>
      </LabelStyles>

      <ContentStyles>
        {techStack.map((dataSet) => (
          <li key={dataSet.category}>
            <Check size={20} />
            <h3>{dataSet.category}</h3>
            <ul>
              {dataSet.items.map((item, index) => (
                <li key={item}>{item}{index < dataSet.items.length - 1 ? "," : ""}</li>
              ))}
            </ul>
          </li>
        ))}
      </ContentStyles>

      <FootNoteStyles>
        <p>
          <Check size={20} /> 8 0f 8 stacks loaded successfully
        </p>

        <p>
          <Flag size={15} fill='black' /> Completed in 5ms
        </p>
      </FootNoteStyles>
    </TechStackStyles>
  )
}

export const TerminalWindow = WindowWrapper(Terminal, "terminal", "Terminal")

const TechStackStyles = styled.div({
  fontSize: "0.875rem",
  fontFamily: '"Roboto Mono", monospace',
  padding: "1.25rem"
})

const LabelStyles = styled.div({
  display: "flex",
  alignItems: "center",

  marginInlineStart: "2.5rem",
  marginTop: "1.75rem",

  "& p:first-of-type": {
    width: "8rem"
  }
})

const ContentStyles = styled.ul({
  paddingTop: "1.25rem",     
  paddingBottom: "1.25rem",

  marginTop: "1.25rem",      
  marginBottom: "1.25rem",

  borderTopWidth: "1px",     
  borderBottomWidth: "1px",
  borderTopStyle: "dashed",  
  borderBottomStyle: "dashed",

  "& > * + *": {
    marginTop: "0.25rem"
  },

  "& li": {
    display: "flex",
    alignItems: "center",

    "& > :first-child": {
      color: "#00A154",  
      width: "1.25rem"   
    },

    "& h3": {
      fontWeight: 600,          
      color: "#00A154",         
      width: "8rem",            
      marginInlineStart: "1.25rem" 
    },

    "& ul": {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem"
    }

  }

})

const FootNoteStyles = styled.div({
  color: "#00A154",

  "& p": {
    display: "flex",
    alignItems: "center",

    "& svg": {
      width: "1.25rem",
      marginInlineEnd: "1.25rem"
    }
  },

  "& p:last-of-type": {
    color: "black"
  },

  "& > * + *": {
    marginTop: "0.25rem"
  }
})