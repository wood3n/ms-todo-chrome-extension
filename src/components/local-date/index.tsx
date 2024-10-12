import { getLocalTimeZone, today } from "@internationalized/date";
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";

import { getLocalDate } from "@/utils/date";

function LocalDate() {
  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Button variant="light" size="sm">
          {getLocalDate()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Calendar
          aria-label="Local Date"
          // @ts-ignore
          value={today(getLocalTimeZone())}
          isReadOnly
        />
      </PopoverContent>
    </Popover>
  );
}

export default LocalDate;
