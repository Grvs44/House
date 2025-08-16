from argparse import ArgumentParser
from datetime import datetime, timedelta

FORMAT = '%Y-%m-%d'


def get_dates(start: datetime, end: datetime):
    dates = []
    day = start.weekday()
    current = start if day == 0 else start + timedelta(days=day)
    week = timedelta(weeks=1)
    while current <= end:
        dates.append(current.strftime(FORMAT))
        current += week
    return dates


def main():
    parser = ArgumentParser()
    parser.add_argument('end', help='End date in format year-month-day')
    parser.add_argument(
        '-s', '--start', default=None,
        help='Start date in format year-month-day')
    args = parser.parse_args()
    start = datetime.today() if args.start is None else datetime.strptime(args.start, FORMAT)
    end = datetime.strptime(args.end, FORMAT)
    print(get_dates(start, end))


if __name__ == '__main__':
    main()
