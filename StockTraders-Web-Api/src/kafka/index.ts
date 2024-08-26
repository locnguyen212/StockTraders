import { Kafka } from "kafkajs"
import { kafkaConfig } from "../config"

const kafka = new Kafka({
    clientId: kafkaConfig.cliendId,
    brokers: kafkaConfig.brokers
})
  
const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: kafkaConfig.groupId })

const produce = async (topic:string, messages:any) => {
    try {
        await producer.connect()
        await producer.send({
            topic: 'my-topic',
            messages: messages,
        })
    } catch (error) {
        console.log(error);       
    } finally {
        await producer.disconnect();
    }
}

const consume = async (topic:string, callback:Function) => {
    try {
        await consumer.connect()
        await consumer.subscribe({ topic: topic, fromBeginning: true })

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                // console.log({
                //     partition,
                //     offset: message.offset,
                //     value: message.value.toString(),
                // })
                // console.log(message);
                
                callback(message.value?.toString())
            },
        })
    } catch (error) {
        console.log(error);       
    }
}

const disconnectConsumer = async () => {
    await consumer.disconnect()
}

export default {
    consume, produce, disconnectConsumer
}