# Shipment booking and status updates

Customers can submit a shipment booking with contact, route, pickup/delivery, service, and parcel details. A signed-in user's ID is attached when available; guest bookings are also accepted. Valid bookings are stored with status `BOOKED` and an initial tracking event. The confirmation page displays a generated `SSB...` tracking number.

Shipment staff can review bookings in `/admin` and add a status, description, and optional location. Each update changes the shipment's current status and appends a tracking event. Access is limited to signed-in emails listed in `ADMIN_EMAILS`.

Status updates are entered by staff. There is no carrier API or automatic live tracking integration in this implementation. The booking and event records are defined in `prisma/schema.prisma`.
