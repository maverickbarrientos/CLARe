import { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

interface DateTimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  placeholder?: string;
  minDate?: Date;
  disabledDates?: Date[];
}

const formatDisplay = (date: Date): string => {
  const pad = (n: number) => String(n).padStart(2, '0');
  const hours = date.getHours();
  const minutes = pad(date.getMinutes());
  const ampm = hours >= 12 ? 'P.M.' : 'A.M.';
  const hour12 = hours % 12 || 12;
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} ${hour12}:${minutes} ${ampm}`;
};

export const formatNaive = (date: Date): string => {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:00`;
};

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

export function DateTimePicker({ value, onChange, placeholder = "Select date & time", minDate, disabledDates }: DateTimePickerProps) {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(value);
  const [view, setView] = useState<'date' | 'time'>('date');
  const [month, setMonth] = useState(value.getMonth());
  const [year, setYear] = useState(value.getFullYear());
  const [day, setDay] = useState(value.getDate());

  const rawHour = value.getHours();
  const [hour, setHour] = useState(rawHour % 12 || 12);
  const [minute, setMinute] = useState(value.getMinutes());
  const [ampm, setAmpm] = useState<'AM' | 'PM'>(rawHour >= 12 ? 'PM' : 'AM');

  const defaultDisabledDates = Array.from({ length: 3 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const resolvedDisabledDates = disabledDates ?? defaultDisabledDates;

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const isDisabled = (d: number) => {
    const dateToCheck = new Date(year, month, d);
    if (minDate) {
      const min = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
      if (dateToCheck < min) return true;
    }
    if (resolvedDisabledDates?.some(disabled =>
      disabled.getFullYear() === year &&
      disabled.getMonth() === month &&
      disabled.getDate() === d
    )) return true;
    return false;
  };

  const handleConfirm = () => {
    let h = hour;
    if (ampm === 'PM' && hour !== 12) h = hour + 12;
    if (ampm === 'AM' && hour === 12) h = 0;

    const date = new Date(year, month, day, h, minute);
    setSelected(date);
    onChange(date);
    setShow(false);
  };

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  return (
    <>
      {/* Trigger Button */}
      <TouchableOpacity
        onPress={() => setShow(true)}
        className="border border-glow rounded-lg px-4 py-3 w-full"
      >
        <Text className="text-white font-sans">
          {selected ? formatDisplay(selected) : placeholder}
        </Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={show} transparent animationType="fade">
        <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}>
          <View className="w-11/12 rounded-2xl p-5 border border-glow" style={{ backgroundColor: '#0a0a0a' }}>

            {/* Tab Switch */}
            <View className="flex-row mb-4">
              {(['date', 'time'] as const).map((v) => (
                <TouchableOpacity
                  key={v}
                  onPress={() => setView(v)}
                  className="flex-1 items-center py-2"
                  style={{ borderBottomWidth: 2, borderBottomColor: view === v ? '#FF8C42' : '#222' }}
                >
                  <Text className={`font-heading text-sm ${view === v ? 'text-glow' : 'text-gray'}`}>
                    {v.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {view === 'date' ? (
              <>
                {/* Month Navigation */}
                <View className="flex-row justify-between items-center mb-3">
                  <TouchableOpacity onPress={prevMonth} className="p-2">
                    <Text className="text-glow font-heading text-2xl">‹</Text>
                  </TouchableOpacity>
                  <Text className="text-white font-heading text-base">
                    {MONTHS[month]} {year}
                  </Text>
                  <TouchableOpacity onPress={nextMonth} className="p-2">
                    <Text className="text-glow font-heading text-2xl">›</Text>
                  </TouchableOpacity>
                </View>

                {/* Weekday Headers */}
                <View className="flex-row mb-2">
                  {DAYS.map(d => (
                    <Text key={d} className="text-glow font-heading text-xs text-center" style={{ flex: 1 }}>{d}</Text>
                  ))}
                </View>

                {/* Calendar Grid */}
                <View className="flex-row flex-wrap">
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <View key={`empty-${i}`} style={{ width: `${100 / 7}%`, aspectRatio: 1 }} />
                  ))}
                  {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => {
                    const disabled = isDisabled(d);
                    const isSelected = day === d;
                    return (
                      <TouchableOpacity
                        key={d}
                        onPress={() => !disabled && setDay(d)}
                        disabled={disabled}
                        style={{
                          width: `${100 / 7}%`,
                          aspectRatio: 1,
                          opacity: disabled ? 0.25 : 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {isSelected && (
                          <View style={{
                            position: 'absolute',
                            width: '75%',
                            aspectRatio: 1,
                            borderRadius: 100,
                            backgroundColor: '#FF8C42',
                            top: '5%',
                          }} />
                        )}
                        <Text style={{
                          color: 'white',
                          fontFamily: 'Montserrat-Bold',
                          fontSize: 13,
                          position: 'relative',
                          top: isSelected ? 4 : 0,
                        }}>
                          {d}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </>
            ) : (
              /* Time Picker */
              <View className="flex-row justify-center items-start" style={{ height: 200, gap: 8 }}>

                {/* Hours */}
                <View className="flex-1 items-center">
                  <Text className="text-glow font-heading text-xs mb-2">HOUR</Text>
                  <ScrollView showsVerticalScrollIndicator={false} className="w-full">
                    {HOURS.map((h) => (
                      <TouchableOpacity
                        key={h}
                        onPress={() => setHour(Number(h))}
                        className="items-center rounded-lg my-0.5 py-2.5"
                        style={{ backgroundColor: hour === Number(h) ? '#FF8C42' : 'transparent' }}
                      >
                        <Text className="text-white font-heading text-base">{h}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                <Text className="text-glow font-heading text-2xl" style={{ paddingTop: 36 }}>:</Text>

                {/* Minutes */}
                <View className="flex-1 items-center">
                  <Text className="text-glow font-heading text-xs mb-2">MIN</Text>
                  <ScrollView showsVerticalScrollIndicator={false} className="w-full">
                    {MINUTES.map((m) => (
                      <TouchableOpacity
                        key={m}
                        onPress={() => setMinute(Number(m))}
                        className="items-center rounded-lg my-0.5 py-2.5"
                        style={{ backgroundColor: minute === Number(m) ? '#FF8C42' : 'transparent' }}
                      >
                        <Text className="text-white font-heading text-base">{m}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                {/* AM/PM */}
                <View className="items-center" style={{ paddingTop: 28 }}>
                  <Text className="text-glow font-heading text-xs mb-2">AM/PM</Text>
                  {(['AM', 'PM'] as const).map((a) => (
                    <TouchableOpacity
                      key={a}
                      onPress={() => setAmpm(a)}
                      className="items-center rounded-lg my-0.5 py-2.5 px-3"
                      style={{ backgroundColor: ampm === a ? '#FF8C42' : 'transparent' }}
                    >
                      <Text className="text-white font-heading text-base">{a}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

              </View>
            )}

            {/* Actions */}
            <View className="flex-row justify-end mt-5" style={{ gap: 12 }}>
              <TouchableOpacity onPress={() => setShow(false)} className="px-4 py-2">
                <Text className="text-gray font-heading">CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleConfirm}
                className="px-5 py-2 rounded-lg bg-glow"
              >
                <Text className="text-white font-heading">CONFIRM</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    </>
  );
}