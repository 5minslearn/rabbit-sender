import amqp from "amqplib";

const queue = "product_inventory";
const text = {
  item_id: "macbook",
  text: "This is a samle message to send receiver to check the ordered Item Availablility",
};

(async () => {
  let connection;
  try {
    connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(text)));
    console.log(" [x] Sent '%s'", text);
    await channel.close();
  } catch (err) {
    console.warn(err);
  } finally {
    if (connection) await connection.close();
  }
})();
