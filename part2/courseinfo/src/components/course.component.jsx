const Header = ({ name }) => <h1>{name}</h1>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => parts.map((part) => <Part key={part.id} part={part} />)

const Total = ({ parts }) => {
    const total = parts.reduce((accumulator, currentValue) => 
    accumulator + currentValue.exercises, 0)
    return <h3>Number of exercises {total}</h3>
}

const Course = ({ course }) => {
    const { name, parts } = course;
    return (
        <div>
          <Header name={name} />
          <Content parts={parts} />
          <Total parts={parts} />
        </div>
      )
}

export default Course;