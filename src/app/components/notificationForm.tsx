import { iForm, iUser } from "@/utils/Types";

const times = [
  '07:00',
  '07:45',
  '08:30',
  '09:15',
  '10:00',
  '10:45',
  '11:30',
  '12:15',
  '13:00',
  '13:45',
  '14:30',
  '15:15',
  '16:00',
  '16:45',
  '17:30',
  '18:15',
  '19:00',
];

const rooms: string[] = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
];

interface Props {
  providers: iUser[]
  submitting: boolean
  formData: iForm
  handleSubmit: (formData: iForm) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
};

export default function NotificationForm(props: Props) {
  return (
    <form>
      <select name="apptTime" value={props.formData.apptTime} onChange={props.handleChange}>
        <option value="">Appointment Time</option>
        {times.map((time) => (
          <option key={time} value={time}>{time}</option>
        ))}
      </select>
      <select name="userId" value={props.formData.userId} onChange={props.handleChange}>
        <option value="">Therapist</option>
        {props.providers.length > 0 && props.providers.map((provider) => (
          <option key={provider.id} value={provider.id}>{provider.name}</option>
        ))}
      </select>
      <fieldset>
        <legend>Select a Room</legend>
        {rooms.map((roomNumber) => (
          <label key={roomNumber}>
            <input
              type="radio"
              name="roomNumber"
              value={roomNumber}
              checked={props.formData.roomNumber === roomNumber}
              onChange={props.handleChange}
            />
            {roomNumber}
          </label>
        ))}
      </fieldset>
      <button type="button" onClick={() => props.handleSubmit(props.formData)} disabled={props.submitting}>
        {props.submitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
};