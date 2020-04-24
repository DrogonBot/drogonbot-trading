import axios from 'axios';
import cron from 'node-cron';

import { PostScrapperHelper } from '../bots/helpers/PostScrapperHelper';
import { Lead } from '../resources/Lead/lead.model';
import { ConsoleColor, ConsoleHelper } from '../utils/ConsoleHelper';


export class LeadsCron {

  public static fetchLeadsFromFirebase = () => {
    // TODO: add eng leads support later

    // every 3 days
    cron.schedule("0 0 */3 * *", async () => {

      const response = await axios.get(`https://app-bo.firebaseio.com/.json`);

      const { leads } = response.data;

      // change BH to MG, since we need the stateCode
      leads.ptbr.mg = leads.ptbr.bh;
      delete leads.ptbr.bh;


      const states = Object.keys(leads.ptbr);

      for (const state of states) {

        for (const [key, value] of Object.entries(leads.ptbr[state])) {

          const leadInfo: any = value;
          // value is what matter to us (user data)

          // check if lead is already saved on database

          try {

            const leadExists = await Lead.exists({ email: leadInfo.email });

            if (leadExists) {
              console.log(`Skipping ${leadInfo.email} because it's already in our database`);
              continue
            }

            // define job roles

            const rawPOIs = leadInfo.position.split(',')

            let jobRolesFound: string[] = []

            // based on what the user has typed in "position" key, lets try to guess what jobRole tag he mean't
            for (let POI of rawPOIs) {
              POI = POI.trim();
              const { jobRoleBestMatch } = await PostScrapperHelper.findJobRolesAndSector(POI);
              jobRolesFound = [
                ...jobRolesFound,
                jobRoleBestMatch
              ]
            }

            ConsoleHelper.coloredLog(ConsoleColor.BgGreen, ConsoleColor.FgWhite, `🤖: Adding lead ${leadInfo.email} (${leadInfo.name}) to our database!`)

            const stateCode = state.toUpperCase()

            const newLead = new Lead({
              stateCode,
              country: "Brazil",
              email: leadInfo.email,
              name: leadInfo.name,
              jobRoles: jobRolesFound
            })
            await newLead.save()

          }
          catch (error) {
            console.error(error);

          }

        }
      }

    });
  }
}