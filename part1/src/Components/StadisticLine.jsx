// eslint-disable-next-line react/prop-types
export const StadisticLine = ({...stadistic}) => {

    const {text, value} = stadistic
  return (
    <p>
        {text}: {value}
    </p>
  )
}
