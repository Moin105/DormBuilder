import React, { useState,useEffect } from 'react';
import {AiFillQuestionCircle} from 'react-icons/ai'
import {FaQuestion} from 'react-icons/fa'
const Accordion = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [parsedAnswer, setParsedAnswer] = useState([]);

    useEffect(() => {
      setParsedAnswer(parseAnswer(answer));
    }, [answer]);

    function parseAnswer(answer) {
        const parts = answer.split('\n');
        const result = [];

        let list = [];
        parts.forEach((part) => {
            const trimmed = part.trim();
        
            if (trimmed.startsWith('1.') || trimmed.startsWith('2.') || trimmed.startsWith('3.') || trimmed.startsWith('4.') || trimmed.startsWith('5.') || trimmed.startsWith('6.') || trimmed.startsWith('7.') || trimmed.startsWith('8.')) {
                list.push(trimmed.slice(2).trim());
            } else {
                if (list.length > 0) {
                    result.push({ type: 'list', content: list });
                    list = [];
                }
                result.push({ type: 'text', content: trimmed });
            }
        });
        
        if (list.length > 0) {
            result.push({ type: 'list', content: list });
        }
        
        return result;
    }
    return (
        <div className="accordion">
            <h3 className='question' onClick={() => setIsOpen(!isOpen)}><FaQuestion/>{question}</h3>
            {isOpen && parsedAnswer.map((part, index) => {
                if (part.type === 'text') {
                    return <p key={index}>{part.content}</p>;
                } else {
                    return (
                        <ul key={index}>
                            {part.content.map((li, liIndex) => (
                                <li key={liIndex}>{li}</li>
                            ))}
                        </ul>
                    );
                }
            })}
        </div>
    );
};

export default Accordion;
