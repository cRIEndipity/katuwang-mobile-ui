import { supabase } from '../lib/supabase'
import { MedicalRecord } from '../components/health-records/types'

export const healthRecordService = {
  async getRecords() {
    const { data, error } = await supabase
      .from('health_records')
      .select('*')
      .order('date', { ascending: false })
      
    if (error) throw error
    return data as MedicalRecord[]
  },

  async addRecord(record: Omit<MedicalRecord, 'id'>) {
    const { data: { user} } = await supabase.auth.getUser()

    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('health_records')
      .insert({
        ...record,
        user_id: user.id
      })
      .select()
      .single()

    if (error) throw error
    return data as MedicalRecord
  }
}