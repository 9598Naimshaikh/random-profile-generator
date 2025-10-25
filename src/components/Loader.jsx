import { Discuss } from 'react-loader-spinner'

export default function Loader() {
  return (
    <Discuss
      visible={true}
      height="60"
      width="60"
      ariaLabel="discuss-loading"
      wrapperStyle={{}}
      wrapperClass="discuss-wrapper"
      color="#fff"
      backgroundColor="#F4442E"
    />
  );
}
