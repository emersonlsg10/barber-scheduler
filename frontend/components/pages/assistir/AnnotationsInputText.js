import React from 'react';
import dynamic from 'next/dynamic';
import { CircularProgress } from '@material-ui/core';

const CustomRichText = dynamic(() => import('components/CustomRichText'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        display: 'flex',
        // dlexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
      }}>
      <CircularProgress size={32} />
    </div>
  ),
});

export default function AnnotationsInputText({
  onChangeText,
  loading,
  text,
  formSubmitted = false,
}) {
  const formikRef = React.useRef();

  React.useEffect(() => {
    if (
      formSubmitted &&
      !loading &&
      formikRef &&
      formikRef.current &&
      formikRef.current.resetForm
    ) {
      formikRef.current.resetForm();
    }
  }, [formSubmitted, loading]);

  return <CustomRichText value={text} onChange={onChangeText} />;
}
