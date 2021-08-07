import { useMemo } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import { JoinFormStage, useJoinForm } from '../JoinFormProvider';
import useDebouncedValue from './useDebouncedValue';

export default function DebouncedCodeValidationLoading() {
  const { stage } = useJoinForm();
  const debouncedStage = useDebouncedValue(stage, 1000);
  const isLoading = useMemo(
    () =>
      debouncedStage === JoinFormStage.VALIDATING_CODE &&
      debouncedStage === stage,
    [debouncedStage, stage]
  );
  return isLoading ? (
    <Spinner
      className="text-white text-lg capitalize"
      label="checking game code..."
    />
  ) : (
    <></>
  );
}
