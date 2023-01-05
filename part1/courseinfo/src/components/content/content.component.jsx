import Part from "../part/part.component";

const Content = (props) => {
    const { parts } = props;
    return (
        <div>
            {parts.map((part) => 
                <Part name={part.name} exercises={part.exercises} key={part.exercises}/>
                )
            }
        </div>
    )
}

export default Content;