import { supabase } from '@/integrations/supabase/client';

export async function completeCyclesAndPayout(userId: string) {
  // 1. Find all cycles for this user that have ended and are not completed
  const { data: cycles, error: cyclesError } = await supabase
    .from('cycles')
    .select('*')
    .eq('user_id', userId)
    .neq('status', 'completed');

  if (cyclesError) throw cyclesError;

  const now = new Date();

  for (const cycle of cycles || []) {
    if (new Date(cycle.end_date) < now) {
      // 2. Mark cycle as completed
      await supabase
        .from('cycles')
        .update({ status: 'completed' })
        .eq('id', cycle.id);

      // 3. Add profit to user's deposit balance (fallback: fetch and update)
      const { data: profile } = await supabase
        .from('profiles')
        .select('deposit_balance')
        .eq('id', cycle.user_id)
        .single();
      if (profile) {
        await supabase
          .from('profiles')
          .update({ deposit_balance: profile.deposit_balance + cycle.profit })
          .eq('id', cycle.user_id);
      }

      // 4. Create a transaction record for profit
      await supabase.from('transactions').insert({
        user_id: cycle.user_id,
        amount: cycle.profit,
        type: 'profit',
        status: 'completed',
        created_at: new Date().toISOString(),
        description: `Profit from cycle #${cycle.cycle_number}`,
      });

      // 5. Check if this is the last cycle for the investment
      const { data: allCycles } = await supabase
        .from('cycles')
        .select('id, status')
        .eq('investment_id', cycle.investment_id);
      const allCompleted = allCycles && allCycles.every((c: any) => c.status === 'completed');
      if (allCompleted) {
        // Get the investment amount
        const { data: investment } = await supabase
          .from('investments')
          .select('amount')
          .eq('id', cycle.investment_id)
          .single();
        if (investment && profile) {
          // Return the principal to the user's deposit balance
          await supabase
            .from('profiles')
            .update({ deposit_balance: profile.deposit_balance + cycle.profit + investment.amount })
            .eq('id', cycle.user_id);
          // Create a transaction record for principal return
          await supabase.from('transactions').insert({
            user_id: cycle.user_id,
            amount: investment.amount,
            type: 'principal_return',
            status: 'completed',
            created_at: new Date().toISOString(),
            description: `Principal returned for investment #${cycle.investment_id}`,
          });
        }
      }
    }
  }
} 