export const Footer = () => {

    return (
        <div className='relative bottom-2 flex justify-center align-middle w-full h-6 my-2'>
            <p className="text-text-muted-extra text-sm font-semibold">&copy; {new Date().getFullYear()}
                <a href="https://github.com/sebastian-sonne"
                    className="hover:text-text-muted transition-colors" target="_blank"> Seatplan.xyz</a>
            </p>
        </div>
    );
}