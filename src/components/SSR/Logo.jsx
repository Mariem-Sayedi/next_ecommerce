import Image from "next/image";
import Link from "next/link";


const Logo = () => {
    return (
 <div className="col-sm-3 d-flex align-items-center">
 <div className="logo">
   <h1>
     <Link href="/">
       <Image src="/img/logo.png" alt="Logo" width={150} height={50} priority style={{ width: 'auto', height: 'auto' }}/>
     </Link>
   </h1>
 </div>
</div>
    )
}
export default Logo;