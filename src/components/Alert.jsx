import '../styles/alert.css'

const Alert = (alerta) => {
    const { alert } = alerta
  return (
    <div className={alert.error === true ? 'alert-error alert' : 'alert-success alert'}>
        <p>{alert.msg}</p>
    </div>
  )
}

export default Alert