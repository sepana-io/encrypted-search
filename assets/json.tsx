import { Icon } from "@chakra-ui/icons";

const JSONIcon = (props:any) => (
    <Icon width="16px" height="16px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.99951 2.984V2H5.90951C5.59651 2 5.29351 2.062 5.00051 2.185C4.70889 2.30725 4.4452 2.48758 4.22551 2.715C4.01171 2.92988 3.84396 3.1861 3.73251 3.468V3.469C3.63331 3.73668 3.56682 4.01537 3.53451 4.299V4.301C3.50607 4.58773 3.49805 4.87613 3.51051 5.164C3.52251 5.454 3.52851 5.744 3.52851 6.033C3.52851 6.236 3.48851 6.426 3.41151 6.605V6.606C3.26475 6.95533 2.99154 7.2364 2.64651 7.393C2.47057 7.46984 2.2805 7.50901 2.08851 7.508H1.99951V8.492H2.08951C2.28451 8.492 2.46951 8.532 2.64551 8.613L2.64651 8.614C2.82451 8.692 2.97551 8.798 3.10151 8.932L3.10351 8.934C3.23351 9.064 3.33651 9.219 3.41051 9.399L3.41151 9.401C3.48951 9.581 3.52851 9.769 3.52851 9.967C3.52851 10.257 3.52251 10.547 3.51051 10.836C3.49851 11.132 3.50651 11.421 3.53451 11.706V11.707C3.56751 11.99 3.63351 12.265 3.73151 12.531V12.532C3.83751 12.805 4.00251 13.056 4.22551 13.285C4.44851 13.515 4.70751 13.692 5.00051 13.815C5.29351 13.938 5.59651 14 5.91051 14H5.99951V13.016H5.90951C5.70951 13.016 5.52251 12.978 5.34651 12.901C5.17675 12.8217 5.0221 12.7134 4.88951 12.581C4.76079 12.444 4.65631 12.2861 4.58051 12.114C4.50651 11.934 4.47051 11.744 4.47051 11.541C4.47051 11.313 4.47351 11.088 4.48151 10.869C4.48951 10.641 4.48951 10.419 4.48151 10.204C4.47799 9.98965 4.45961 9.77581 4.42651 9.564C4.3947 9.35509 4.33831 9.15067 4.25851 8.955C4.10287 8.57637 3.84832 8.24653 3.52151 8C3.84869 7.7536 4.10359 7.42375 4.25951 7.045C4.33951 6.853 4.39451 6.652 4.42751 6.443C4.46051 6.233 4.47851 6.02 4.48251 5.803C4.49051 5.583 4.49051 5.361 4.48251 5.137C4.47451 4.913 4.47051 4.687 4.47051 4.459C4.46878 4.17239 4.55087 3.89152 4.70668 3.65095C4.8625 3.41038 5.08525 3.22062 5.34751 3.105C5.52409 3.02404 5.71626 2.98273 5.91051 2.984H5.99951ZM9.99951 13.016V14H10.0895C10.4025 14 10.7055 13.938 10.9985 13.815C11.2915 13.692 11.5505 13.515 11.7735 13.285C11.9965 13.055 12.1615 12.805 12.2665 12.532V12.531C12.3665 12.265 12.4315 11.988 12.4645 11.701V11.699C12.4925 11.419 12.5005 11.132 12.4885 10.836C12.4765 10.546 12.4705 10.256 12.4705 9.967C12.4705 9.764 12.5105 9.574 12.5875 9.395V9.394C12.7341 9.04456 13.0074 8.76344 13.3525 8.607C13.5285 8.53027 13.7185 8.4911 13.9105 8.492H13.9995V7.508H13.9095C13.7135 7.508 13.5285 7.468 13.3525 7.387L13.3515 7.386C13.1798 7.31201 13.025 7.20381 12.8965 7.068L12.8945 7.066C12.7624 6.93288 12.658 6.77482 12.5875 6.601V6.599C12.5094 6.42055 12.4692 6.22781 12.4695 6.033C12.4695 5.743 12.4755 5.453 12.4875 5.164C12.5 4.8738 12.492 4.58307 12.4635 4.294V4.293C12.4311 4.01143 12.365 3.73478 12.2665 3.469V3.468C12.1548 3.18602 11.9867 2.92979 11.7725 2.715C11.5528 2.4876 11.2891 2.30727 10.9975 2.185C10.7097 2.06277 10.4002 1.99985 10.0875 2H9.99951V2.984H10.0895C10.2895 2.984 10.4765 3.022 10.6515 3.099C10.8255 3.181 10.9775 3.287 11.1085 3.419C11.2355 3.553 11.3385 3.709 11.4175 3.886C11.4915 4.066 11.5275 4.256 11.5275 4.459C11.5275 4.687 11.5245 4.911 11.5165 5.131C11.5085 5.359 11.5085 5.581 11.5165 5.796C11.5205 6.018 11.5385 6.231 11.5715 6.436C11.6045 6.65 11.6605 6.852 11.7395 7.045C11.8955 7.42372 12.1504 7.75356 12.4775 8C12.1504 8.24644 11.8955 8.57628 11.7395 8.955C11.6603 9.14845 11.6039 9.35049 11.5715 9.557C11.5385 9.767 11.5205 9.98 11.5165 10.197C11.5084 10.4189 11.5084 10.6411 11.5165 10.863C11.5245 11.087 11.5285 11.313 11.5285 11.541C11.5301 11.8276 11.448 12.1084 11.2922 12.3489C11.1364 12.5895 10.9137 12.7793 10.6515 12.895C10.4749 12.976 10.2828 13.0173 10.0885 13.016H9.99951Z" fill="white"/>
    </Icon>
  )

  export default JSONIcon