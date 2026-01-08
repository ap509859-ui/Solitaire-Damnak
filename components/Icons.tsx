
import React from 'react';

export type IconName = 
  | 'room-service' | 'poolside' | 'breakfast' | 'restaurant' 
  | 'tours' | 'ticket' | 'massage' | 'bicycle' | 'laundry' 
  | 'taxi' | 'housekeeping' | 'fixing' | 'map' | 'pin'
  | 'stats' | 'active' | 'completed' | 'rating' | 'checkout' | 'hotel' | 'chat' | 'whatsapp' | 'telegram' | 'bot';

interface IconProps {
  name: IconName | string;
  className?: string;
  style?: React.CSSProperties;
}

const Icons: React.FC<IconProps> = ({ name, className = "w-6 h-6", style }) => {
  const icons: Record<string, React.ReactNode> = {
    'hotel': (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    ),
    'room-service': (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 17h18a1 1 0 011 1v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-1a1 1 0 011-1zm3-2s0-6 6-6 6 6 6 6H6zm6-6V7m0 0a1 1 0 100-2 1 1 0 000 2z" />
    ),
    'poolside': (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 12l-7-9h14l-7 9zm0 0v8m-4 0h8M7 3l1 1m8-1l-1 1" />
    ),
    'breakfast': (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 10h1a2 2 0 012 2v1a2 2 0 01-2 2h-1m-10-5a3 3 0 013-3h4a3 3 0 013 3v5a3 3 0 01-3 3H7a3 3 0 01-3-3V10zM6 18h12" />
    ),
    'restaurant': (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M6 2v4M9 2v4M6 22V11" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 22V12M18 12a3.5 4.5 0 100-9 3.5 4.5 0 000 9z" />
      </>
    ),
    'tours': (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    ),
    'ticket': (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
    ),
    'massage': (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 19h18M5 15h14a2 2 0 002-2v-1a2 2 0 00-2-2H5a2 2 0 00-2 2v1a2 2 0 002 2zm7-9a3 3 0 110-6 3 3 0 010 6z" />
    ),
    'bicycle': (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18.5 17.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm-11 0a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM15 17.5H9m0-6V15m6-4V15m0-4l-3-3m0 0l-3 3m3-3V5" />
    ),
    'laundry': (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2zm0 4h10M9 6h1m4 0h1m-3 8a3 3 0 100 6 3 3 0 000-6z" />
    ),
    'taxi': (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 11l1.4-2.8A2 2 0 016.2 7h11.6a2 2 0 011.8 1.2L21 11m-18 0v4a1 1 0 001 1h16a1 1 0 001-1v-4m-18 0h18M5 17a2 2 0 104 0 2 2 0 00-4 0zm10 0a2 2 0 104 0 2 2 0 00-4 0z" />
      </>
    ),
    'housekeeping': (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2v10" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 12l1 8h8l1-8H7zM9 20v-4m3 4v-4m3 4v-4" />
      </>
    ),
    'fixing': (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 01 7.94-7.94l-3.77 3.77z" />
    ),
    'map': (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5-4.03L4 4l5 4.03L15 4l5 4.03L20 20l-5-4.03L9 20z M9 8v12 M15 4v12" />
    ),
    'pin': (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    ),
    'stats': (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    ),
    'active': (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    'completed': (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
    ),
    'rating': (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    ),
    'checkout': (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
    ),
    'chat': (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    ),
    'bot': (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h.01M15 9h.01M12 12h.01M10 15h4" />
    ),
    'whatsapp': (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 21l1.65-3.8a9 9 0 113.4 2.9L3 21z M9 8a.5.5 0 00-1 0v.5C8 10.5 9.5 12 11.5 12h.5a.5.5 0 000-1H11.5c-1.5 0-2.5-1-2.5-2.5V8z" />
    ),
    'telegram': (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 5L2 12.5l7 1l2.5 6.5l3.5-4.5l5 3.5L21 5z M9 13.5L18 7.5L10.5 14.5" />
    )
  };

  const selectedIcon = icons[name] || icons['hotel'];

  return (
    <svg 
      className={className} 
      style={style} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {selectedIcon}
    </svg>
  );
};

export default Icons;
