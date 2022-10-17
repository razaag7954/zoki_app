function Header({ text }) {
    return (
        <div className='text-white py-5' style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
            <div className='container text-center'>
                <h1>{text}</h1>
            </div>
        </div>
    )
}

export default Header;